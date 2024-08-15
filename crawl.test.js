import { normalizeURL, getURLsFromHTML, crawlPage } from './crawl.js'
import { test, expect } from '@jest/globals'

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("url from html", () => {
  const baseURL = "https://blog.boot.dev"
  const html = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
  const result = getURLsFromHTML(html, baseURL)
  const expected = ["https://blog.boot.dev/"]
  expect(result).toEqual(expected)
})


test("multiple urls", () => {
  const html = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const baseURL = "https://blog.boot.dev"
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(getURLsFromHTML(html, baseURL)).toEqual(expected)

})



test("crawling page", () => {
  const domain = "https://wagslane.dev"
  const result = "no clue rly"
  expect(crawlPage(domain)).toEqual(result)
});
