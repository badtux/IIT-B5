function checkNum (num,age)
    {
        switch (true)
            {
                case(num === 20 && age === 18):
                    console.log("From case 20");
                    break;
                case 10:
                    console.log("Number is "+num);
                case 20:
                    console.log("Number is "+num);
                    break;
                default:
                    console.log("In default case");
                    break;
            }
    }
checkNum(20)