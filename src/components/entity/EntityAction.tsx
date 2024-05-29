import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {Save, Delete, List, History, Upload} from '@mui/icons-material/';
import ConfirmDialog from '../../modal/Confirm'
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStores } from '../../context/root-store-general-context';
import { useNavigate } from 'react-router-dom';


type Props = {
  entityID: number,
  handleDelete: Function,
  handleSave: Function
}

export default function EntityAction({entityID, handleDelete, handleSave}: Props) {
  const navigate = useNavigate();

  const { Entity } = useStores();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSpeedDeal, setShowSpeedDeal] = useState(false);

  function handleDeleteButton() {
    setShowConfirmDelete(true);
  };

  const actions = [
    { icon: <Delete />, name: 'Удалить', key: 'delete', mb: 0, action: handleDeleteButton },
    { icon: <Save />, name: 'Сохранить', key: 'save', mb: 0, action: saveEntity },
    { icon: <History />, name: 'История', key: 'history', mb: 2, action: openHistory },
    { icon: <Upload />, name: 'Прикрепить файлы', key: 'upload', mb: 0, action: goToUploader },
    { icon: <List />, name: 'К списку', key: 'list', mb: 0, action: goToEntityList },
  ];

  function deleteEntity() {
    setShowConfirmDelete(false);
    handleDelete(entityID)
        .then(()=>{
          console.log("Delete Success");
          return navigate(`/${Entity.entity.rentity_type_name}`);
        })
        .catch(()=>console.log("Delete ERROR"));
    ;
  };

  function saveEntity() {
    handleSave(Entity.entity?.entity_id);
    console.log(Entity.entity?.entity_id);
  };

  function openHistory() {
    console.log(`Entity ${Entity.entity.entity_id}: open history`);
    return navigate(`/history`, {state: {id: Entity.entity.entity_id}});
  };

  function goToEntityList() {
    return navigate(`/${Entity.entity.rentity_type_name}`);
  };

  function goToUploader() {
    return navigate(`/upload`);
  };

  return (
      <>
        <SpeedDial
            onFocusCapture={e=>e.stopPropagation()}
            onClose={()=>{setShowSpeedDeal(false)}}
            onOpen={()=>{setShowSpeedDeal(true)}}
            open={showSpeedDeal}
            ariaLabel='Entities'
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
              <SpeedDialAction
                  onClick={action.action}
                  sx={{ mb: action.mb }}
                  key={action.key}
                  icon={action.icon}
                  tooltipTitle={action.name}
              />
          ))}
        </SpeedDial>
        {
            showConfirmDelete && createPortal(
                <ConfirmDialog
                    open={showConfirmDelete}
                    textTitle='ВНИМАНИЕ'
                    textContent='Удалить карточку?'
                    textCloseBtn='Отмена'
                    textOKBtn='Удалить'
                    handleClose={()=>setShowConfirmDelete(false)}
                    handleOK={deleteEntity}
                />, document.body
            )
        }
      </>
  );
};