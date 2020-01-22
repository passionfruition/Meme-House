import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            redirect: false
        };
    }

    componentDidMount() {
        //do an axios call to grab our secret message!
        axios.get("/api/protected")
            .then(result => this.setState({ message: result.data.message }))
            .catch(err => {
                console.log(err);
            });
        this.id = setTimeout(() => this.setState({ redirect: true }), 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return (
            this.state.redirect
                ? <Redirect to="/home" />
                : <div className="columns">
                    <div className="column is-6-tablet is-offset-3-tablet">
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="box">
                            <p className="title">{this.state.message || ''},</p>
                            <p className="subtitle">{this.props.user.email}</p>
                            <p className="subtitle">You may now post memes!</p>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Members;