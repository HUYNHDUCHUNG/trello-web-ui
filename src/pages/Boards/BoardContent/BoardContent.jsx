import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'

import { MouseSensor, TouchSensor } from '~/customLibraries'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInColumn,
  moveCardOtherColumn,
  deleteColumnDetails
}) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có 1 phần tủ được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnDragingCard, setOldColumnDragingCard] = useState(null)

  // Điểm va chạm cuối cùng của thuật toán phát hiện va chạm
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(board?.columns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDragingCardId)

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragingCardId)

        const rebuild_activeDragingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        }

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDragingCardData)

        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      if (triggerFrom === 'handleDragEnd') {
        moveCardOtherColumn(activeDragingCardId, oldColumnDragingCard._id, nextOverColumn._id, nextColumns)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumnDragingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    if (!active || !over) return

    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDragingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardId,
        data: { current: activeDragingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDragingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnDragingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData,
          'handleDragEnd'
        )
      } else {
        const oldCardIndex = oldColumnDragingCard?.cards?.findIndex((c) => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnDragingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)
        setOrderedColumns((prevColumns) => {
          const nextColumn = cloneDeep(prevColumns)

          const targetColumn = nextColumn.find((column) => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)

          return nextColumn
        })
        moveCardInColumn(dndOrderedCards, dndOrderedCardIds, oldColumnDragingCard._id)
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== event.id) {
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsId = dndOrderedColumns.map((c) => c._id)
        setOrderedColumns(dndOrderedColumns)

        moveColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnDragingCard(null)
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Tìm các điểm giao nhau
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return

      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            })
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      collisionDetection={collisionDetectionStrategy}
      // collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#2a9dcc'),
          height: (theme) => theme.trello.boardContentHeight,
          width: '100%',
          p: '10px 0'
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
