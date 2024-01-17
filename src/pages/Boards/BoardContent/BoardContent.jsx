import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    console.log(event)
    const { active, over } = event

    if (!over) return

    if (active.id !== event.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsId = dndOrderedColumns.map((c) => c._id)
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#2a9dcc'),
          height: (theme) => theme.trello.boardContentHeight,
          width: '100%',
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
