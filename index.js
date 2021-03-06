const queryString = require("query-string");

class CrudRepository {
  constructor({
    $axios,
    resource,
    includes = ["getAll", "getOne", "createOne", "updateOne", "deleteOne"],
    excludes = [],
  }) {
    this.$axios = $axios;
    this.resource = resource;

    includes
      .filter((include) => !excludes.includes(include))
      .forEach((include) => {
        this[include] = this[include].bind(this);
      });
  }

  getAll(paginator = {}) {
    const query = queryString.encode(paginator);

    return this.$axios.$get(`${this.resource}?${query}`);
  }

  getOne(filterKey) {
    return this.$axios.$get(`${this.resource}/${filterKey}`);
  }

  createOne(payload) {
    return this.$axios.$post(`${this.resource}`, payload);
  }

  updateOne(filterKey, payload) {
    return this.$axios.$patch(`${this.resource}/${filterKey}`, payload);
  }

  deleteOne(filterKey) {
    return this.$axios.$delete(`${this.resource}/${filterKey}`);
  }
}

module.exports = CrudRepository;
