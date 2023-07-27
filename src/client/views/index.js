import DataTable from '../components/datatable/datatable.js';

class App {
  static init() {
    this.dt = new DataTable({
      sourceUrl: '/getSampleData',
      placeholder: '.dataTable',
      headers: ['userId', 'username', 'email', 'password', 'birthdate', 'registeredAt'],
    });
  }

  static run() {
    this.dt.fetchData();
  }
}

App.init();
App.run();

window.App = App;
