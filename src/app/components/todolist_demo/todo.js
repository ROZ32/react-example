import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<tr>
				<th scope="row">{index}</th>
				<td className={classNames({'item-done': item.done})}>
				{
					item.edit ? <input type="text" placeholder={item.name} defaultValue={item.name} ref={(edit) => this["edit-" + item.name] = edit }/> : item.name
				}
				</td>
				<td>
					{
						!item.edit &&
						<div className="actions-buttons">
							<a onClick={() => this.toggleItemStatus(item, index)}>
								{
									item.done && <i className="fa fa-check-square-o" aria-hidden="true"></i>
								}
								{
									!item.done && <i className="fa fa-square-o" aria-hidden="true"></i>
								}
							</a>
							<a onClick={() => this.toggleEdit(item, index)}>
								<i className="fa fa-pencil" aria-hidden="true"></i>
							</a>
							<a onClick={() => this.removeItem(index)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</a>
						</div>
					}
					{
						item.edit &&
						<div className="actions-buttons">															
							<button type="button" className="btn btn-info" onClick={() => this.editItem(item, index)}>Change</button>
							<button type="button" className="btn btn-secondary" onClick={() => this.toggleEdit(item, index)}>Cancel</button>
						</div>
					}
				</td>
			</tr>
        );
    }
}

export default Todo;
