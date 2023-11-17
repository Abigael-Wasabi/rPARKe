const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtaXNoQGdtYWlsLmNvbSIsImlhdCI6MTcwMDIxNzQ1NywiZXhwIjoxNzAwMjIxMDU3fQ.LFgnazxkEUkEd5igY0OVey9o0ra00zNKGiCNT9_CuUM";
 

const decoded = jwt.decode(token);

console.log(decoded);
