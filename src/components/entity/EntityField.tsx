import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { dateToMUI } from '../../utils/utils';
import { useStores } from '../../context/root-store-general-context';
import { EntityAttribute } from '../../api/getEntity';

type Props = {
  attribute: EntityAttribute
};

export default function EntityField ({attribute} : Props) {

  const { Entity } = useStores();

  const rAttrLabel = attribute?.rattr_label;
  const rAttrType = attribute?.rattr_type;
  const entityAttrValue = attribute?.entity_attr_value;
  const rattrName = attribute?.rattr_name

  const readOnly = {
    readOnly: attribute?.read_only || false
  };

  switch(rAttrType) {
    case 'date':
      return (
        <TextField
          size='small'
          type='date'
          variant='standard'
          sx={{ m: 2 }}
          InputProps={ readOnly }
          helperText={rAttrLabel}
          defaultValue={dateToMUI(entityAttrValue)}
          name={rattrName}
          InputLabelProps={{ shrink: true }}
        />
      );
      break;
    case 'string':
      return (
        <TextField
          size='small'
          variant='standard'
          sx={{ m: 2 }}
          helperText={rAttrLabel}
          defaultValue={entityAttrValue}
          InputProps={readOnly}
          name={rattrName}
          onChange={(e)=>Entity.updateEntityAttribute(e.target.name, e.target.value)}
        />
      );
      break;
    case 'longstring':
      return (
        <TextField
          multiline
          fullWidth
          maxRows={4}
          size='small'
          variant='standard'
          sx={{ m: 2 }}
          helperText={rAttrLabel}
          defaultValue={entityAttrValue}
          InputProps={readOnly}
          name={rattrName}
        />
      );
      break;
    case 'bool':
      return <FormControlLabel control={<Checkbox defaultChecked={!!entityAttrValue} name={rattrName} disabled={readOnly.readOnly}/>} label={rAttrLabel} />
      break;
    default:
      return (
        <TextField
          size='small'
          variant='standard'
          sx={{ m: 2 }}
          helperText={rAttrLabel}
          defaultValue={entityAttrValue}
          InputProps={readOnly}
          name={rattrName}
        />
      );
      break;
  };
};
