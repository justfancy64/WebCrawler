function printReport(pages) {
  console.log("starting report")
  let sorted_pages
  sorted_pages = sortingAlg(pages)
  // sorting the list
  for (const [key, value] of Object.entries(sorted_pages)) {
    console.log(`Found ${value} internal links to ${key}`)

}

        
}

function sortingAlg(pages) {
  const sortable = Object.fromEntries(
  Object.entries(pages).sort(([,a],[,b]) => b-a)
  )

 return sortable
 }

export { printReport }
