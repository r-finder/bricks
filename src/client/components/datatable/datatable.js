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
        this.currentPage = 0;
        this.totalPages = Math.ceil(data.length / this.pageSize);
        this.update();
      })
      .catch((error) => {
        console.error('Unable to fetch data:', error);
      });
  }

  incPage(inc) {
    const newPage = this.currentPage + inc;
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.currentPage = newPage;
    this.update();
  }

  test() {
    alert('test');
  }

  update() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const rows = this.data.slice(start, end);
    this.dtElement.innerHTML = tmpl({ headers: this.headers, rows: rows });
    this.dtElement.dt = this;

    this.pager.innerHTML = pagerTmpl({
      current: this.currentPage,
      total: this.totalPages,
      size: this.pageSize,
      dt: this,
    });
    this.pager.dt = this;
  }
}

export default DataTable;
