class Http {
  static BASE_URL = "http://localhost:8000/";

  static async getRequest(path) {
    return (await fetch(path)).json();
  }
  static async postRequest(path, method = "POST", body) {
    const options = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return (await fetch(path, options)).json();
  }

  static async get(path) {
    return await this.getRequest(`${this.BASE_URL}${path}`);
  }
  static async post(path, body) {
    return await this.postRequest(`${this.BASE_URL}${path}`, "POST", body);
  }
  static async put(path, param, body) {
    return await this.postRequest(
      `${this.BASE_URL}${path}/${param}`,
      "PUT",
      body
    );
  }
  static async delete(path, param) {
    return await this.postRequest(`${this.BASE_URL}${path}/${param}`, "DELETE");
  }
}

export default Http;
