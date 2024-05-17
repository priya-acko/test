import { TestInfo } from '@playwright/test';
import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';
import axios from 'axios';

class MyReporter implements Reporter {

    teamId: string | null;
    totalCasesPassed: number;
    totalCasesSkipped: number;
    totalCasesFailed: number;
    testsCompleted: number;
    testRetries; number;


    constructor() {
        this.teamId = null;
        this.totalCasesPassed = 0;
        this.totalCasesSkipped = 0;
        this.totalCasesFailed = 0;
        this.testsCompleted = 0;
        this.testRetries = 0;
    }
    async onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
        console.log("current running file name = " + suite.suites[0].suites[0].title.split(".")[0].split("/").slice(1));
        const now = new Date();
        const startTime = now.toISOString();
        const serviceName = suite.suites[0].suites[0].title.split(".")[0].split("/").slice(1)
        const teamName = "health";
        const category = "Regression";
        console.log('Before all tests' + serviceName);
        try {
            const requestBody = {
                "teamName": "health",
                "serviceName": serviceName.toString().toLowerCase(),
                "category": "REGRESSION",
                "startTime": startTime
            };
            console.log("request  body of the api = " + JSON.stringify(requestBody));
            const response = await axios.post("https://central-qa-automation-dashboard-dev.internal.ackodev.com/testrun/generateid", requestBody);
            console.log("------------------");
            console.log(await response.data);
            this.teamId = await response.data.runId;
            console.log("-------------------");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
        }
    }

    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
        console.log("test retries count  = " + test.retries);
        if (result.status == "passed") {
            this.totalCasesPassed++;
        }
        if (result.status == "failed" || result.status == "timedOut") {
            if (test.retries === 1) {
                this.totalCasesFailed++;
            }
        }
        if (result.status == "skipped") {
            this.totalCasesSkipped++;
        }
        if (test.retries > 0) {
            test.retries--;
        }
    }

    async onEnd(result: FullResult) {
        console.log(`Finished the run: ${result.status}`);
        console.log('After all tests');
        console.log("team id of the test run  = " + await this.teamId);
        let testSummary = {
            "testCasesPassed": this.totalCasesPassed,
            "testCasesFailed": this.totalCasesFailed,
            "testCasesSkipped": this.totalCasesSkipped
        }
        const now = new Date();
        const currentTimeUTC = now.toISOString();
        let endTime = currentTimeUTC;
        try {
            const requestBody = {
                "testSummary": testSummary,
                "endTime": endTime,
                "status": "completed",
                "report": "http://jenkins-qa.ackodev.com/job/playwright_retail/ws/playwright-report/index.html/"
            };
            console.log("request body = " + JSON.stringify(requestBody));
            const response = await axios.post("https://central-qa-automation-dashboard-dev.internal.ackodev.com/testrun/" + await this.teamId + "/update", requestBody);
            console.log("------------------");
            console.log(response.data);
            console.log("-------------------");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
        }

    }
}

export default MyReporter;