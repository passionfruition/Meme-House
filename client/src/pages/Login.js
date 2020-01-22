import React from "react";
import axios from "axios";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    componentDidMount() {
        // document.getElementById("add-meme").disabled = true;
    }

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

        axios.post("/auth/login", { email: email, password: password })
            .then(result => {
                this.setState({ error: "" });
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
                        <h5 className="card-header-title title">
                           Log In
                        </h5>
                    </header>
                    <div className="card-content">
                        <p className="subtitle">Please login to continue.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label className="label" htmlFor="exampleInputEmail1">Email address</label>
                                <div className="control has-icons-left">
                                    <input type="email" name="email" autoComplete="username" value={this.state.email} onChange={this.handleChange} className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="exampleInputPassword1">Password</label>
                                <div className="control has-icons-left">
                                    <input type="password" name="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} className="form-control input" id="exampleInputPassword1" placeholder="Password" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            {(this.state.error ?
                                <div className="notification is-danger is-light" role="alert">
                                    Sorry, we couldn't log you in with that username and password. Please try again.
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

export default Login;