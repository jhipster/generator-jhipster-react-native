/**
 *   Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 *   This file is part of the JHipster project, see https://www.jhipster.tech/
 *   for more information.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 * From: https://github.com/jhipster/react-jhipster/blob/1bf7272cc48c9b23c8daa6eb3a8bb5b7c957d245/src/util/url-utils.ts
 */

/**
 * Get base path from current window location
 */
export const getBasePath = () => window.location.href.split('#')[0]

/**
 * Parse the header link element and return all links inside.
 * @param header header of link
 */
export const parseHeaderForLinks = (header) => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length')
  }

  // Split parts by comma
  const parts = header.split(',')
  const links = {}

  // Parse each part into a named link
  parts.forEach((p) => {
    const section = p.split(';')

    if (section.length !== 2) {
      throw new Error('section could not be split on ";"')
    }

    const url = section[0].replace(/<(.*)>/, '$1').trim()
    const queryString = {}

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3))

    let page = queryString.page

    if (typeof page === 'string') {
      page = parseInt(page, 10)
    }

    const name = section[1].replace(/rel="(.*)"/, '$1').trim()
    links[name] = page
  })
  return links
}
