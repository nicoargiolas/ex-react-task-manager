import { memo } from 'react'

function TaskRow(props) {
    const { id, title, status, createdAt } = props;

    // Oggetto che gestisce il colore della casella in base allo stato, viene richiamato nella casella
    const colors = {
        'To do': '#e74c3c',   // rosso
        'Doing': '#f1c40f',   // giallo
        'Done': '#2ecc71'     // verde
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