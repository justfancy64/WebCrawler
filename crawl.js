// this is a url handling module
import { JSDOM } from "jsdom"
import process from 'node:process';


function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}
function getURLsFromHTML(htmlBody, baseURL) {
  const url = []
  const dom = new JSDOM(htmlBody)
  const anchors = dom.window.document.querySelectorAll('a')

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        href = new URL(href, baseURL).href
    url.push(href);
      } catch(err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }
  return url  
}


export { normalizeURL, getURLsFromHTML }


async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const currentURLObj = new URL(currentURL)
  const baseURLObj = new URL(baseURL)
  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages
  }

  const normalizedURL = normalizeURL(currentURL)

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }

  pages[normalizedURL] = 1

  console.log(`crawling ${currentURL}`)
  let html = ''
  try {
    html = await crawlAndParse(currentURL)
  } catch (err) {
    console.log(`${err.message}`)
    return pages
  }

  const nextURLs = getURLsFromHTML(html, baseURL)
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
}

async function crawlAndParse (currentURL) {
  let res
  try {
    res = await fetch(currentURL)
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }
  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
  }

  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`Got non-HTML response: ${contentType}`)
  }
	
 const html = await res.text()

	return html
}

export { crawlPage, crawlAndParse } 




