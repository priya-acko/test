 class BasePage {


    mobileNumber() {
        var result = Math.floor(Math.random() * 999999);
        var index = Math.floor(Math.random() * 19 + 1);
        let arr = [6010, 6011, 6012, 6013, 6014, 6015, 6016, 6017, 6018, 6019, 6020, 6021, 6022, 6023, 6024, 6025, 6026, 6027, 6028, 6029];
        return "" + (arr[index] * 1000000 + result);
    }
    
       randomName(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    }
    module.exports ={BasePage}