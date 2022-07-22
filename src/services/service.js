import http from "../http-common";

class TableDataService {
  getAll() {
    return http.get("/velocity");
  }

  get(year) {
    return http.get(`/velocity/${year}`);
  }

  create(data) {
    return http.post("/velocity", data);
  }

  update(year, data) {
    return http.put(`/velocity/${year}`, data);
  }

  delete(year) {
    return http.delete(`/velocity/${year}`);
  }

  deleteAll() {
    return http.delete(`/velocity`);
  }

  findByTitle(year) {
    return http.get(`/velocity?year=${year}`);
  }
}

export default new TableDataService();