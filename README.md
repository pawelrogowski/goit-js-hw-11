<h1>GoIT-JS-HW-10</h1><h1>Acceptance criteria</h1></header><ul><li><code>goit-js-hw-10</code> repository created.</li><li>In your submitted homework, there are two links: to the source files and your
working page on <code>GitHub Pages</code>.</li><li>During live page visits, there are no errors or warnings generated in the
console.</li><li>Project built with
<a href="https://github.com/goitacademy/parcel-project-template" target="_blank" rel="noopener noreferrer">parcel-project-template</a>.</li><li>Code formatted with <code>Prettier</code>.</li></ul><h2 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="start-files">Start files<a class="hash-link" href="#start-files" title="Direct link to heading">​</a></h2><p><a href="https://downgit.github.io/#/home?url=https://github.com/goitacademy/javascript-homework/tree/main/v2/10/src" target="_blank" rel="noopener noreferrer">Download the starter files</a>
with the basic design and task styles. Copy them into your project, completely
substituting the <code>src</code> folder in
<a href="https://github.com/goitacademy/parcel-project-template" target="_blank" rel="noopener noreferrer">parcel-project-template</a>.</p><h2 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="task---country-search">Task - country search<a class="hash-link" href="#task---country-search" title="Direct link to heading">​</a></h2><p>Create a front-end part of the application to search for information about
countries by their partial or full names. Check out the demo video of the app.</p><div style="margin-bottom:20px;width:640px;height:360px"></div><h3 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="http-requests">HTTP requests<a class="hash-link" href="#http-requests" title="Direct link to heading">​</a></h3><p>Use the public API <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">Rest Countries</a>, namely
<a href="https://restcountries.com/#api-endpoints-v3-name" target="_blank" rel="noopener noreferrer">resource name</a>, which returns
an array of country objects that match the search criteria. Add at least some
decoration to the interface elements.</p><p>Write a function, <code>fetchCountries(name)</code>, that makes an HTTP request to
<a href="https://restcountries.com/#api-endpoints-v3-name" target="_blank" rel="noopener noreferrer">resource name</a> and returns a
promise with an array of countries - the result of your request. Move it to a
separate file called <code>fetchCountries.js</code> and make a named export.</p><h3 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="field-filtering">Field filtering<a class="hash-link" href="#field-filtering" title="Direct link to heading">​</a></h3><p>The back-end returns objects with some properties most of which you do not need.
To reduce the amount of data transferred, add a string of request parameters -
this is how this back-end implements field filtering. Check out the
<a href="https://restcountries.com/#filter-response" target="_blank" rel="noopener noreferrer">filter syntax documentation</a>.</p><p>You only need the following properties:</p><ul><li><code>name.official</code> - full name of the country</li><li><code>capital</code> - capital</li><li><code>population</code> - population</li><li><code>flags.svg</code> - link to flag images</li><li><code>languages</code> - array of languages</li></ul><h3 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="search-box">Search box<a class="hash-link" href="#search-box" title="Direct link to heading">​</a></h3><p>The user enters the name of the country to search for in the <code>input#search-box</code>
text field. HTTP requests are made by typing the country name, that is, on the
<code>input</code> event. However, you cannot make a request every time a key is pressed,
since many requests will be made at the same time, and they will be executed in
an unpredictable order.</p><p>It is necessary to use the <code>Debounce</code> technique on the event handler and make an
HTTP request <code>300ms</code> after the user has stopped typing text. Use the
<a href="https://www.npmjs.com/package/lodash.debounce" target="_blank" rel="noopener noreferrer">lodash.debounce</a> package.</p><p>If the user clears the search box completely, the HTTP request is not executed,
and the country list markup or country information disappears.</p><p>Sanitize the entered line using the <code>trim()</code> method, which will solve the
problem when there are only spaces in the input field or at the beginning/end of
the line.</p><h3 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="interface">Interface<a class="hash-link" href="#interface" title="Direct link to heading">​</a></h3><p>If the back-end returns more than 10 countries, a notification appears in the
interface saying that the name should be more specific. For notifications, use
the <a href="https://github.com/notiflix/Notiflix#readme" target="_blank" rel="noopener noreferrer">notiflix library</a> and display
this line: <code>&quot;Too many matches found. Please enter a more specific name.&quot;</code>.</p><p><img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/too-many-matches.png" alt="Too many matches alert" class="img_ev3q"></p><p>If the back-end returns from 2 to 10 countries, a list of found countries is
displayed under the text field. Each list item consists of a flag and country
name.</p><p><img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/country-list.png" alt="Country list UI" class="img_ev3q"></p><p>If the request results in an array with one country, the interface displays the
card markup with information about the country: flag, name, capital, population
and languages.</p><p><img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/country-info.png" alt="Country info UI" class="img_ev3q"></p><div class="theme-admonition theme-admonition-caution alert alert--warning admonition_LlT9"><div class="admonitionHeading_tbUL"><span class="admonitionIcon_kALy"><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg></span>Attention</div><div class="admonitionContent_S0QG"><p>It is enough for the app to work for most countries. Some countries, such as
<code>Sudan</code>, can be problematic because the name of the country is part of the name
of another country, <code>South Sudan</code>. Do not worry about these exceptions.</p></div></div><h2 class="anchor anchorWithHideOnScrollNavbar_WYt5" id="error-handling">Error handling<a class="hash-link" href="#error-handling" title="Direct link to heading">​</a></h2><p>If the user enters the name of a country that does not exist, the back-end will
return not an empty array, but an error with the status code <code>404</code> - not found.
If you do not handle this, the user will never know that the search has not
returned any results. Add a notification, &quot;Oops, there is no country with that
name&quot;`, in case of an error using the
