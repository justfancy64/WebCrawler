import {  crawlPage } from "./crawl.js"
import process from 'node:process';
import { printReport } from "./report.js"



async function main() {
  // grab user input as input
 let pages  = []
 const processes =  process.argv
 if (processes.length != 3) {
   console.log("invalid input URL")
 } else {

pages = await crawlPage(process.argv[2])
 
	
 }
  console.log(pages)
  printReport(pages)
}



main()
