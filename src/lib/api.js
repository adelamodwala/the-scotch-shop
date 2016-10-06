let apiAddress;
if (process.env.NODE_ENV === 'production') {
    apiAddress = '';
}
else {
    apiAddress = 'http://localhost:9050';
}


/**
 * Sanitize optional arguments for post requests
 * @param  {Object} opts Request specific options to be sanitized
 * @return {Object}      Sanitized options
 */
function sanitizePostOpts(opts) {
    let contentType = opts.contentType ? opts.contentType : 'application/json';
    let optHeaders = opts.headers ? opts.headers : {};
    let optBody = opts.body ? opts.body : '';
    let host = opts.host || apiAddress;

    return {
        contentType,
        optHeaders,
        optBody,
        host
    }
}

/**
 * Perform a GET request to the app server
 * @param  {Object} opts contains endpoint, body[, contentType]
 * @return {Promise}     To handle returned data or errors
 */
export function getFetch(opts) {
    let sanitizedOpts = sanitizePostOpts(opts);
    let getOpts = {
        method: 'GET',
        mode: 'cors',
        headers: {
            ...sanitizedOpts.optHeaders
        }
    };

    return fetch(sanitizedOpts.host + opts.endpoint, getOpts);
}

/**
 * Perform a POST request to the app server
 * @param  {Object} opts contains endpoint, body[, contentType]
 * @return {Promise}     To handle returned data or errors
 */
export function postFetch(opts) {
    let sanitizedOpts = sanitizePostOpts(opts);
    let postOpts = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': sanitizedOpts.contentType,
            ...sanitizedOpts.optHeaders
        }
    };
    if (sanitizedOpts.optBody != '') {
        postOpts.body = sanitizedOpts.optBody;
    }

    return fetch(sanitizedOpts.host + opts.endpoint, postOpts);
}
