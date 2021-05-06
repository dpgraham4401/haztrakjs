// e-Manifest Services
//
const eManAPI = require('./eManAPI')

/**
 * Get manifests Data and/or attachment
 *
 * @param {string} mtn manifest tracking number
 * @param {boolean} attachments [1] get zip files [0] just JSON
 * */
async function eManGet (mtn, attachments = 0) {
  try {
    if (attachments) {
      const res = await eManAPI.get({
        url: `/emanifest/manifest/${mtn}/attachments`,
        // responeType: 'blob',
        headers: {
          Accept: 'multipart/mixed'
        }
      })
      // var boundIndex = res.headers['content-type'].indexOf('boundary=') + 'boundary='.length
      // var bound = '--' + res.headers['content-type'].slice(boundIndex, res.headers['content-type'].length)

      // var d = new Dicer({boundary: bound})
      // d.on('part', function(p) {
      //     console.log('New Part!');
      //     p.on('header', function(header){
      //         for (var h in header) {
      //             console.log('Part header: K ' + inspect(h) + ' ' inspect(header[h]));
      //         }
      //     })
      // })

      // fs.writeFile('./test.json', emanData[1], function (err) {
      //   if (err) {
      //     return console.log(err)
      //   }
      // })
      // fs.writeFile('./attachment_test.zip', emanData[2], 'binary', function (err) {
      //   if (err) {
      //     return console.log(err)
      //   }
      // })
      return res
    } else {
      const res = await eManAPI.get({
        url: `/emanifest/manifest/${mtn}`,
        headers: {
          Accept: 'application/json'
        }
      })
      return res.data
    }
    // console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

export { eManGet }

// Testing Area
// const mtn = '100024721ELC'
// const attachments = 0
// eManGet(mtn, attachments)
