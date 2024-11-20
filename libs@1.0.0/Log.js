/**
 *   _                   _     
 *  | |    ___   __ _   (_)___ 
 *  | |   / _ \ / _` |  | / __|
 *  | |__| (_) | (_| |_ | \__ \
 *  |_____\___/ \__, (_)/ |___/
 *              |___/ |__/     
 * 
 * @filename     Log.js
 * @author       Mohammad Aqib
 * @version      v1.0.0
 * @release_date 24-10-2024
 * @website      https://app.site123.com/?w=9799688&disableCache=4797005
 
 * @description  Log.js is a lightweight JavaScript logging library that
                 provides a simple and customizable way to log variables,
                 objects, and errors. It also includes a function to display 
                 log messages in a div element. This library is useful for 
                 debugging and testing purposes.
 **/
const Log=new Object;

/**
 * @function formatObject: Formats an object into a string with proper indentation.
 * @param {object} obj The object to format.
 * @returns {string} The formatted object as a string.
 **/
Log.formatObject=(obj)=>{const format=(obj,level=1)=>{let str="";const indent="   ".repeat(level);if("object"==typeof obj&&null!==obj){str+=`${indent}{`;for(const key in obj)obj.hasOwnProperty(key)&&(str+=`\n${indent+"    "}${key}: ${format(obj[key],level+1)}`);str+=`\n${indent}}`}else str="string"==typeof obj?`"${obj}"`:"number"==typeof obj||"boolean"==typeof obj?`${obj}`:"function"==typeof obj?"function":void 0===obj?"undefined":null===obj?"null":`Anonymous type - ${typeof obj}`,str+=`${indent}`;return str};return format(obj)};


/**
 * @function formatVar: Formats a variable into a string representation.
 * @param {any} variable The variable to format.
 * @returns {string} The formatted variable as a string.
 **/
Log.formatVar=variable=>"object"==typeof variable&&null!==variable?`Object\n${Log.formatObject(variable)}`:"string"==typeof variable?`"${variable}"`:"number"==typeof variable||"boolean"==typeof variable?`${variable}`:"function"==typeof variable?`Æ’(${variable.name||" [anonymous function] "}):\n\n${variable||"function () { [undefined code] }"}`:null==variable?"null":typeof variable;


/**
 * @function print: Prints formatted variable values to the console, accepts multiple parameters.
 * @param {...any} args The variables to print.
 **/
Log.print=(...args)=>{args.forEach(arg=>{let formattedArg=Log.formatVar(arg);console.log(formattedArg)})};


/**
 * @function getCurrentTime: Returns the current time as a string. If "date" is passed, returns date with time.
 * @param {string} [format] The format for the current time. If 'date', returns date with time.
 * @returns {string} The current time as a string.
 **/


Log.getCurrentTime=format=>{const now=new Date,hours=now.getHours().toString().padStart(2,"0"),minutes=now.getMinutes().toString().padStart(2,"0"),seconds=now.getSeconds().toString().padStart(2,"0"),year=now.getFullYear(),month=(now.getMonth()+1).toString().padStart(2,"0"),day=now.getDate().toString().padStart(2,"0");return"date"===format?`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`:`${hours}:${minutes}:${seconds}`};


/**
 * @function logInDiv: Displays console output in a div and captures console logs, errors, warnings.
 **/
Log.logInDiv=()=>{let logCount={console:0,error:0,warning:0,other:0,total:0};const debugDiv=document.createElement("div");debugDiv.id="debugDiv";const summary=document.createElement("p");summary.classList.add("summary"),summary.textContent="MESSAGE: 0 ";const details=document.createElement("span");details.textContent="(CONSOLE: 0, JS ERROR: 0, WARNING: 0)",summary.appendChild(details),debugDiv.appendChild(summary),document.body.appendChild(debugDiv);
  /**
   * @memberof logInDiv
   * @function updateSummary: Updates the log summary text in the debug div.
   **/
  const updateSummary=()=>{summary.textContent=`MESSAGE: ${logCount.total} (CONSOLE: ${logCount.console}, JS ERROR: ${logCount.error}, WARNING: ${logCount.warning}, OTHER: ${logCount.other})`};

  /**
   * @memberof logInDiv
   * @function appendChild: Appends a message to the debug div.
   * @param {string} className The class name for the message type.
   * @param {string} message The message to append.
   * @returns {HTMLElement} The appended message element.
   **/
  const appendMessage=(className,message)=>{const messageElement=document.createElement("p");messageElement.classList.add(className),messageElement.textContent=message;const hr=document.createElement("hr");debugDiv.appendChild(hr),debugDiv.appendChild(messageElement),logCount.total++,logCount.other=logCount.total-(logCount.console+logCount.error+logCount.warning)-1,updateSummary();return messageElement};window.addEventListener("error",event=>{if(event.error){const errorMessage=`JS ERROR: ${event.message}`,errorTime=Log.getCurrentTime(),errorFile=event.filename||"unknown script",errorLine=event.lineno||"unknown line",errorColumn=event.colno||"unknown column",messageElement=appendMessage("error",`${errorMessage}`),errorLink=document.createElement("a");errorLink.href=`${errorFile}#${errorLine}:${errorColumn}`,errorLink.innerText=`\n// ${errorTime} at ${errorFile}:${errorLine}:${errorColumn}`,errorLink.style.color="red",messageElement.appendChild(errorLink),logCount.error++,updateSummary()}});const originalConsoleError=console.error;console.error=(...args)=>{const errorMessage=` ${[].join.call(args," ")}`;appendMessage("error",errorMessage),logCount.error++,updateSummary(),originalConsoleError.apply(console,args)};const originalConsoleLog=console.log;console.log=(...args)=>{const logMessage=` ${[].join.call(args," ")}`;appendMessage("console",logMessage),logCount.console++,updateSummary(),originalConsoleLog.apply(console,args)};const originalConsoleWarn=console.warn;console.warn=(...args)=>{const warnMessage=` ${[].join.call(args," ")}`;appendMessage("warning",warnMessage),logCount.warning++,updateSummary(),originalConsoleWarn.apply(console,args)};const originalConsoleInfo=console.info;console.info=(...args)=>{const infoMessage=` ${[].join.call(args," ")}`;appendMessage("info",infoMessage),updateSummary(),originalConsoleInfo.apply(console,args)};const originalConsoleDebug=console.debug;console.debug=(...args)=>{const debugMessage=` ${[].join.call(args," ")}`;appendMessage("debug",debugMessage),updateSummary(),originalConsoleDebug.apply(console,args)};

  /**
   * @memberof logInDiv
   * @function addStyles: Adds styles to the document head.
   * @param {string} css The CSS to add.
   **/
  const addStyles=css=>{const style=document.createElement("style");style.textContent=css,document.head.appendChild(style)};addStyles(`#debugDiv{font-family:monospace;background-color:#fff;padding:20px;overflow:hidden;line-height:20px;user-select:text;color:#000;border-radius:10px;margin:10px;border:1px solid #000}#debugDiv hr{border-top:1px solid #444;}#debugDiv p{margin:0;white-space:pre;overflow-x:auto;padding:2px 0;}#debugDiv p.summary{font-weight:bold;color:#00ddff;}#debugDiv p.console{color:#000;}#debugDiv p.warning{color:#ffff00;}#debugDiv p.error{color:#ff0000;}#debugDiv p.debug{color:grey;}`);

console.log(` Log.js loaded successfully!!\n  on ${Log.getCurrentTime()}\n  at your document (${document.location.href}) & happy coding!!`)};

/**@description important links:
 * @website   {@link https://app.site123.com/?w=9799688&disableCache=4797005 }
 * @github    {@link https://github.com/Mohammad-Aqib786/libs }
 * @codefile  {@link https://codefile.io/f/yWYgEtmsKB }
 **/
