const Markdown = require('markdown-it')
const md = new Markdown()

module.exports = source => {
	return `export default \`${md.render(source)}\``
}
