import React, { Component } from 'react'
import axios from 'axios'
class DynamicSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Student: [],
    }
    this.node = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.onSearchClick)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onSearchClick)
  }
  onSearchClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return
    }
    this.setState({
      Student: [],
    })
  }
  handleAPI = async (e) => {
    await axios
      .get('https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json')
      .then((res) => {
        this.setState({
          Student: res.data.data,
        })
      })
      .catch((err) => {
        alert(err)
      })
    let convertToLc = e.target.value.toLowerCase()
    let filterData = this.state.Student.filter((e) => {
      let nameToLc = e.attributes.name.toLowerCase()
      return nameToLc.indexOf(convertToLc) !== -1
    })
    this.setState({
      Student: filterData,
    })
  }
  render() {
    return (
      <div className="container mt-5">
        <h2>React Filter Search Module Example</h2>
        <div className="mt-4">
          <input
            type="text"
            onClick={this.onSearchClick}
            className="form-control"
            onChange={this.handleAPI}
            placeholder="Choose Manager"
            ref={this.node}
          />
        </div>
        <ul className="list-group">
          {this.state.Student.map((res) => {
            return (
              <div
                className="list-group-item list-group-item-action"
                key={res.id}
              >
                <span> {res.attributes.name} </span>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default DynamicSearch;
