import { Box } from "@mui/material";
import EntityField from "../../components/entity/EntityField.tsx"
import { Entity } from "../../api/getEntity.tsx";

type Props = {
  entity: Entity
};

export default function EntityDetailBody ({entity}: Props) {
  const entityAttr = entity.entity_attr;
  
  const listFields = entityAttr.map((attribute) => <EntityField key={attribute?.entity_attr_id} attribute={attribute} />)

  return <Box display="block" justifyItems="center">{listFields}</Box>
};
