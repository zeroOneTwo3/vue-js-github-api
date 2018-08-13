const gitSearchUrl = "https://api.github.com/search/repositories";
const filter = "&sort=stars&order=desc";

function buildUrl (word, checkedLangs) {
	console.log(checkedLangs);
	var len = checkedLangs.length
	var language;
	for(var i=0; i<len; i++)
		language = "+language:" + checkedLangs[i];
	return gitSearchUrl + "?q=" + word + language + filter;
}

const vm = new Vue({
  el: '#app',
  data: {
    results: [],
	count: 0,
	checkedLangs: ["php", "javascript"]
  },
  mounted () {
    this.getPosts('home');
  },
  methods: {
    getPosts(projName) {
		if(this.checkedLangs.length == 0)
			alert("Select Language!");
      let url = buildUrl(projName, this.checkedLangs);
      axios.get(url).then((response) => {
        this.results = response.data.items;
		this.count = response.data.items.length;
      }).catch( error => { console.log(error); });
    }
  }
});