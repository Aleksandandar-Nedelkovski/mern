import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCategory } from "../../actions/category";

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      categoryName: "",
    };

    /** Ensure to bind our methods to this by adding them here **/
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeCategoryName(e) {
    this.setState({
      no: 1,
      categoryName: e.target.value,
    });
  }

  /** Method to handle the submit event of the form **/
  onSubmit(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    console.log(`Form submitted:`);
    console.log(`Todo category: ${this.state.categoryName}`);

    const newTodo = {
      no: this.state.no,
      categoryName: this.state.categoryName,
    };
    // this.props.addCategory(newTodo);
    addCategory(newTodo);
    // api.post("http://localhost:5000/category/add", newTodo).then((result) => {
    // api.post("/category/add", newTodo).then((result) => {
    //   this.props.history.push("/ShowCategoryList/");
    // });
    // .catch(console.log(err));

    // Reset the Values.
    this.setState({
      categoryName: "",
      todo_completed: false,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <Link to="/" className="btn btn-light">
                  Go Back
                </Link>
                <br />
                <br />
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  Create Category
                </h1>
                <div className="form-group">
                  <label>New Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="categoryName"
                    placeholder="Enter Category name"
                    value={this.state.categoryName}
                    onChange={this.onChangeCategoryName}
                  />
                </div>

                <br />
                <button
                  type="submit"
                  value="Add Category"
                  className="btn btn-lg btn-info btn-block"
                >
                  Add Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { addCategory })(CreateCategory);
