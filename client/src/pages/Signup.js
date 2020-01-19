import React from "react";
import API from "../utils/API";

class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleChange = event => {
        event.preventDefault();

        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { email, password } = this.state; //grab the current state for email and password

        API.signup(email, password)
            .then(result => {
                console.log(result);
                this.setState({ email: '', password: '', error: '' });
                this.props.onSuccess(result.data);
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err });
            });
    };

    render() {
        return (
            <div className="container">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            <h5 className="title">Sign Up</h5>
                        </p>
                    </header>
                    <div className="card-content">
                        <p className="subtitle">Please sign up for an account.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label className="label" htmlFor="exampleInputEmail1">Email address</label>
                                <div className="control has-icons-left">
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="exampleInputPassword1">Password</label>
                                <div className="control has-icons-left">
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control input" id="exampleInputPassword1" placeholder="Password" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            {(this.state.error ?
                                <div className="alert alert-danger" role="alert">
                                    Sorry, we couldn't sign you up with that username and password. Please try again.
                                    </div>
                                :
                                '')}
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-link" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;