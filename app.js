const terminal =
document.getElementById(
"typing-bg"
);

const code = [

"> Initializing secure environment...",

"$ sudo apt update",

"$ ssh analyst@10.10.14.21",

"$ nmap -sV -Pn target.local",

"[+] 22/tcp open ssh",

"[+] 443/tcp open https",

"$ python3 scanner.py",

"def analyze(network):",

"   for host in hosts:",

"      enumerate(host)",

"      inspect(service)",

"return report",

"$ tcpdump -i eth0",

"SELECT username",

"FROM users",

"WHERE role='admin';",

"if(authentication==false){",

"   deny_access();",

"}",

"while(system.online){",

"   monitor();",

"}",

"$ sudo systemctl restart",

"[✓] Scan completed",

"[✓] Environment secured",

"> waiting..."

];


let currentLine = 0;
let currentChar = 0;

function type(){

if(currentLine >= code.length){

terminal.innerHTML="";

currentLine=0;

currentChar=0;

}

const current =
code[currentLine];

terminal.innerHTML +=

current[
currentChar
] || "";

currentChar++;

if(currentChar > current.length){

terminal.innerHTML += "<br>";

currentLine++;

currentChar=0;

}

terminal.scrollTop =
terminal.scrollHeight;

setTimeout(

type,

20

);

}

type();
