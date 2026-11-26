/** @type {HTMLInputElement} */
let symbols =
{
    '0' : '0',
    '1' : '1',
    '2' : '2',
    '3' : '3',
    '4' : '4',
    '5' : '5',
    '6' : '6',
    '7' : '7',
    '8' : '8',
    '9' : '9',
    'e' : Math.E,
    'Π' : Math.PI,
    'xy' : '^',
    '+' : '+',
    '-' : '-',
    '*' : '*',
    '/' : '/',
    '.' : '.',
    '(' : '(',
    ')' : ')',
    "mod" : "mod"
};
let radios = document.getElementsByClassName("radio");
let keys = ['0','1','2','3','4','5','6','7','8','9',"mod",'/','*','+','-','%','.','(',')','Π','e','xy']
let buttons = document.querySelectorAll(".button:not(.C,.m,#equal)");
let Ms = document.getElementById("M").children;
let erase_buttons = document.querySelectorAll(".C");
let textboxs = document.getElementsByClassName("textbox");
let exp = "0";
let first_time = true;
radios[0].checked = true;
Array.from(Ms).forEach(M => {
    M.addEventListener("click",
        function()
        {
             if(window.getComputedStyle(M).backgroundColor == "rgb(255, 255, 255)")
                {
                    M.style.backgroundColor = "rgb(255, 255, 17)";
                }
             else
                {
                   M.style.backgroundColor = "rgb(255, 255, 255)";
                    
                }     
        }
    )
});
Array.from(buttons).forEach(button => {
    button.addEventListener("click",
        function() 
        {
            if(keys.includes(button.innerText))
            {
                
                
                if(first_time)
                {
                    exp = "";
                    first_time=false;
                }
                exp += symbols[button.innerText];
                textboxs[1].value = exp; 
                textboxs[1].style.boxShadow = "inset 0 0 0 0px #000";
            
                    textboxs[1].style.borderLeft="0px";
                    textboxs[1].style.borderRight="0px";
                    textboxs[1].style.borderWidth="3.5px";
                    textboxs[1].style.borderColor="#aba5a5";
            setTimeout(
                () => 
                {
                    textboxs[1].style.border="0px";
                    textboxs[1].style.boxShadow = "inset 0 0 0 2.5px #000";
                },
                100
            )
            }
            
            
            
        }
    )
    let font_c;
    let back_c;
    if(button.innerText!="=" && button.innerText!="+/-")
    {
        button.addEventListener("mouseenter",
        function()
        {
            font_c = button.style.color;
            back_c = button.style.backgroundColor;
            button.style.backgroundColor= "#277cc6ff";
            button.style.color= "rgba(255, 255, 255, 1)";
            button.style.boxShadow = "0px 2px #12034fff";
        }
    )
    button.addEventListener("mouseleave",
        function()
        {
            button.style.backgroundColor= back_c;
            button.style.color= font_c;
            button.style.boxShadow = "0px 2px #AAAAAA";
        }
    )
    }
    
});

Array.from(erase_buttons).forEach(button => {
    button.addEventListener("click",
        function() 
        {
            textboxs[1].style.boxShadow = "inset 0 0 0 0px #000";
            textboxs[1].style.borderBottom="3.5px solid #aba5a5";
            textboxs[0].value = "";
            if(button.innerText=="C")
            {
                    
                    textboxs[1].value = "0";
                    exp="";
                    
            }
            else
            {
                let n = exp.length;
                if(n == 1)
                {
                    textboxs[1].value = "0";
                    exp="";
                }
                else
                {
                    if(n != 0)
                    {
                        exp = exp.substring(0,n-1);
                        textboxs[1].value = exp;
                    }
                    
                }
            }
                    
        }

    )
});


for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("click",
        function()
        {
            radios[i].checked = true;
            for (let j = 0; j < radios.length; j++) {
                if(j != i)
                {
                    radios[j].checked = false;
                }
            }
        }
    )
    
    let functions = Array.from(document.getElementsByClassName("function"));
    functions.push(document.getElementById('equal'));
   
     
}
function evaluation(exp) {

    while(exp.includes('mod') || exp.includes('^') || exp.includes("/") || exp.includes("*") || exp.includes("+") || exp.includes("-") || exp.includes("(") || exp.includes(")"))
    {
        let n = exp.length;
        let operator_index;
        if(exp.includes("mod"))
        {
            operator_index = exp.indexOf("mod");
        }
        if(exp.includes("^"))
        {
            operator_index = exp.indexOf("^");
        }
        if(exp.includes("/"))
        {
            operator_index = exp.indexOf("/");
        }
        else if(exp.includes("*"))
        {
            operator_index = exp.indexOf("*");
        }
        else if(exp.includes("+"))
        {
            operator_index = exp.indexOf("+");
        }
        else if(exp.includes("-"))
        {
            operator_index = exp.indexOf("-");
        }
        let x_index=operator_index-1;
        if(x_index==-1)
        {
            break;
        }
        let y_index=operator_index+1;
        while(x_index > 0 && (exp.substring(x_index,x_index+1) != "(" && exp.substring(x_index,x_index+1) != "/" && exp.substring(x_index,x_index+1) != "*" && exp.substring(x_index,x_index+1) != "+" && exp.substring(x_index,x_index+1) != "-"))
        {
            x_index--; 
        }
        if(exp.substring(x_index,x_index+1) == "(" || exp.substring(x_index,x_index+1) == "/" || exp.substring(x_index,x_index+1) == "*" || exp.substring(x_index,x_index+1) == "+" || exp.substring(x_index,x_index+1) == "-")
        {
            x_index++;
        }
        

         while(y_index < exp.length-1 && (exp.substring(y_index,y_index+1) != ")" && exp.substring(y_index,y_index+1) != "/" && exp.substring(y_index,y_index+1) != "*" && exp.substring(y_index,y_index+1) != "+" && exp.substring(y_index,y_index+1) != "-"))
        {
            y_index++; 
        }
        if(exp.substring(y_index,y_index+1) == ")" || exp.substring(y_index,y_index+1) == "/" || exp.substring(y_index,y_index+1) == "*" || exp.substring(y_index,y_index+1) == "+" || exp.substring(y_index,y_index+1) == "-")
        {
            y_index--;
        }
        let x = Number(exp.substring(x_index,operator_index));
        let y = Number(exp.substring(operator_index+1,y_index+1));
        let z = "";
        let op = exp.substring(operator_index,operator_index+1);
        if(op == "mod")
        {
            z = x % y;
        }
        else if(op == "^")
        {
            z = Math.pow(x,y);
        }
        else if(op == "/")
        {
            z = x / y;
        }
        else if(op == "*")
        {
            z = x * y;
        }
        else if(op == "+")
        {
            z = x + y;
        }
        else if(op == "-")
        {
            z = x - y;
        }
        let s1 = exp.substring(0,x_index);
        let s2 = z.toString();
        let s3 = exp.substring(y_index+1,n);
        exp = s1.concat(s2,s3);

    }
    textboxs[0].value = exp;
    return exp;
}

Array.from(buttons).forEach(button => {
    if(button.innerText == "√")
    {
        
        button.addEventListener("click",
            function()
            {
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "sqrt(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "sqrt(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.sqrt(x);
                textboxs[0].value = exp;
                
            }
            
        )
        
    }

    else if(button.innerText == "x2")
    {
        button.addEventListener("click",
            function()
            {
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "sqr(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "sqr(".concat(textboxs[0].value,")");
                }
                if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                
                let x = Number(exp);
               exp = x*x;
                textboxs[0].value = exp;
                
                
            }
            
        )
    }

    else if(button.innerText == "x3")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "cube(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "cube(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = x*x*x
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "|X|")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "mod(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "mod(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.abs(x);
                textboxs[0].value = exp;
                
            }
            
        )
        
    }
    else if(button.innerText == "ex")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "exp(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "exp(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.exp(x);
                textboxs[0].value = exp;
            }
           
        )
        
    }

    else if(button.innerText == "ln")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "ln(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "ln(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.log(x)
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "log")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "log(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "log(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.log10(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "exp")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "pow10(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "pow10(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.pow(10,x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "log2x")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "logXbase2(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "logXbase2(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.log2(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }
    else if(button.innerText == "1/x")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "reciproc(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "reciproc(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = 1/x;
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "10x")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "powten(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "powten(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = Math.pow(10,x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "n!")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "fact(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "fact(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                exp = factorial(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "sin")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "sin(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "sin(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                if(radios[0].checked == true)
                {
                     x = x*Math.PI/180;
                }
                exp = Math.sin(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "cos")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "cos(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "cos(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                if(radios[0].checked == true)
                {
                     x = x*Math.PI/180;
                }
                else if(x != Math.PI/2)
                {
                    exp = Math.cos(x);
                }
                else
                {
                    exp = 0;
                }
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "tan")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "tan(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "tan(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                if(radios[0].checked == true)
                {
                    x = x*Math.PI/180;
                }
                exp = Math.tan(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "sin-1")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "asind(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "asind(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.asin(x);

                if(radios[0].checked == true)
                {
                    exp = exp*180/Math.PI;
                }
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "cos-1")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "acosd(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "acosd(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.acos(x);

                if(radios[0].checked == true)
                {
                    exp = exp*180/Math.PI;
                }
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "tan-1")
    {
        
        button.addEventListener("click",
            function()
            {
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "atand(".concat(textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "atand(".concat(textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.atan(x);

                if(radios[0].checked == true)
                {
                    exp = exp*180/Math.PI;
                }
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "sinh")
    {
        
        button.addEventListener("click",
            function()
            {
                 let s = 'd';
                 if(radios[0].checked == false)
                 {
                    s = 'r';
                 }   
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "sinh".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "sinh".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.sinh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "cosh")
    {
        
        button.addEventListener("click",
            function()
            {
                let s = 'd';
                 if(radios[0].checked == false)
                 {
                    s = 'r';
                 } 
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "cosh".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "cosh".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.cosh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "tanh")
    {
        
        button.addEventListener("click",
            function()
            {
                
                let s = 'd';
                if(radios[0].checked == false)
                 {
                    s = 'r'
                 }
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "tanh".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "tanh".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.tanh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "sinh-1")
    {
        
        button.addEventListener("click",
            function()
            {
                 let s = 'd';
                 if(radios[0].checked == false)
                 {
                    s = 'r';
                 }   
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "sinh-1".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "sinh-1".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.asinh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "cosh-1")
    {
        
        button.addEventListener("click",
            function()
            {
                let s = 'd';
                 if(radios[0].checked == false)
                 {
                    s = 'r';
                 } 
               
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "cosh-1".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "cosh-1".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.acosh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }

    else if(button.innerText == "tanh-1")
    {
        
        button.addEventListener("click",
            function()
            {
                
                let s = 'd';
                if(radios[0].checked == false)
                 {
                    s = 'r'
                 }
                if(textboxs[0].value == "")
                {
                    exp = textboxs[1].value;
                    textboxs[1].value = "tanh-1".concat(s,'(',textboxs[1].value,")");
                }
                else
                {
                    exp = textboxs[0].value;
                    textboxs[1].value = "tanh-1".concat(s,'(',textboxs[0].value,")");
                }
                 if(exp.includes('/'))
                {
                    
                    exp = evaluation(exp);
                }
                let x = Number(exp);
                
                exp = Math.atanh(x);
                textboxs[0].value = exp;
            }
            
        )
        
    }
    
});

function factorial(n) {
    if(n <= 1)
    {
        return 1;
    }
    return n * factorial(n-1);
}
document.getElementById("equal").addEventListener("click",function (){evaluation(exp)})
form = document.getElementsByClassName('Body')[0];
let arrow = document.getElementById("Arrow");
arrow.addEventListener('mouseenter',function()
{
    arrow.style.cursor = "pointer";
    arrow.style.backgroundColor="#fff";
})
arrow.addEventListener('mouseleave',
    function(a)
        {
            
            arrow.style.backgroundColor="";
        }
    
)
arrow.addEventListener('mouseup',function()
    {
        form.style.borderColor = "#cc5c07";
    }
)
let card = document.getElementsByClassName("Body")[0];
  let newX = 0, newY = 0, startX = 0, startY = 0;

  arrow.addEventListener('mousedown', mouseDown);
  arrow.ondragstart = () => false; // Prevent default drag behavior

  function mouseDown(e) {
    
    form.style.borderColor = "#fff";
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }

  function mouseMove(e) {
    newX = e.clientX - startX;
    newY = e.clientY - startY;

    startX = e.clientX;
    startY = e.clientY;

    card.style.top = (card.offsetTop + newY) + 'px';
    card.style.left = (card.offsetLeft + newX) + 'px';
  }

  function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    
}

