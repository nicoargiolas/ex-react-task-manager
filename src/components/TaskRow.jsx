import { memo } from 'react'

function TaskRow(props) {
    const { id, title, status, createdAt } = props;

    // Oggetto che gestisce il colore della casella in base allo stato, viene richiamato nella casella
    const colors = {
        'To do': 'red',
        'Doing': 'yellow',
        'Done': 'green'
    }

    return (
        <tr>
            <td> {title} </td>
            <td style={{ backgroundColor: colors[status] }}> {status} </td>
            <td> {createdAt} </td>
        </tr>
    )
}

export default memo(TaskRow)