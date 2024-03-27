import { Client, QueryResult } from 'pg';
export default class DB{
    private DBconfig =
    {
      user: "ackommunication",
      host: "acko-services-dev-rds.acko.in",
      DatabaseName: "ackommunication",
      password: "PieS0sfc2vtpICTi2fta",
      port: 5432,
  
    };

    async executeQuery(query: string) {
        const client = new Client(this.DBconfig);
        let result
        try {
          await client.connect();
          result = await client.query(query);
        } catch (error) {
          console.error("Error in connection/executing query:", error);
        } finally {
          await client.end().catch((error) => {
            console.error("Error ending client connection:", error);
          });
          return (result.rows);
        }
      };
  
  }