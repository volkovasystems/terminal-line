var consoleDebug = console.debug;
console.debug = terminalLine( "console-debug", consoleDebug ); 

console.debug( "Console.debug Test", "world domination", "progressively" );
console.debug( "Console.debug Test", "world domination", "progressively" );

require(  )