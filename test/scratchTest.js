import haztrak from '../index.js'
const fooBar = async () => {
  const stateCode = 'VA'
  const siteType = 'tsdf'
  const res = await haztrak.eMan.sites(stateCode, siteType)
  console.log(res)
}
fooBar()
