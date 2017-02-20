import React from 'react';

class FilteredList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialItems: [
        "Tokyo",
        "Madrid",
        "Paris",
        "L.A.",
        "New York",
        "Berlin",
        "Buenos Aires",
        "Rio de Janeiro"
      ],
      items: []
    }
    //bind your functions in the class constructor
    this.filterList = this.filterList.bind(this);
  }

  filterList(e) {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentWillMount() {
    this.setState({items: this.state.initialItems})
  }

  render() {
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
}

class List extends React.Component {
  render(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )
  }
};

export default FilteredList;
