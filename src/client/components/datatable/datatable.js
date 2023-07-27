import tmpl from './datatable.pug';
import pagerTmpl from './pager.pug';

class DataTable {
  constructor(options) {
    this.sourceUrl = options.sourceUrl;
    this.placeholder = options.placeholder;
    this.headers = options.headers;
    this.data = [];
    this.currentPage = 0;
    this.totalPages = 0;
    this.pageSize = 20;

    this.init();
  }

  init() {
    this.dtElement = document.querySelector(this.placeholder);
    this.pager = document.createElement('div');
    this.dtElement.parentNode.insertBefore(this.pager, this.dtElement.nextSibling);
  }

  fetchData() {
    fetch(this.sourceUrl, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.data = data;
        this.updateDataPage();
        this.updatePager();
      })
      .catch((error) => {
        console.error('Unable to fetch data:', error);
      });
  }

  updateDataPage() {
    this.dtElement.innerHTML = tmpl({ headers: this.headers, rows: this.data });
  }

  updatePager() {
    this.pager.innerHTML = pagerTmpl({
      current: this.currentPage,
      total: this.totalPages,
      size: this.pageSize,
    });
  }
}

export default DataTable;
