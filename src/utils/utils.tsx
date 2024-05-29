import { Entity } from "../api/getEntity";

function dateToMUI(dateString: string) {
  if (dateString) {
    return dateString.split('.').reverse().join('-');
  };
};

function MUIToDate(MUIString: string) {
  if (MUIString) {
    return MUIString.split('-').reverse().join('.');
  }
}

function getCandidateName(ent: Entity) {
  const surnameIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='surname');
  const nameIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='name');
  const patrIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='patronymic');

  const surname = (ent.entity_attr[surnameIndex]?.entity_attr_value) ? ent.entity_attr[surnameIndex].entity_attr_value : '';
  const name = (ent.entity_attr[nameIndex]?.entity_attr_value) ? ent.entity_attr[nameIndex].entity_attr_value : '';
  const patr = (ent.entity_attr[patrIndex]?.entity_attr_value) ? ent.entity_attr[patrIndex].entity_attr_value : '';
  return `${surname} ${name} ${patr}`
};

function getCandidateSpec(ent: Entity) {
  const specIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='speciality');

  const spec = (ent.entity_attr[specIndex].entity_attr_value) ? ent.entity_attr[specIndex].entity_attr_value : '';
  return spec
};

function getRequestNumber(ent: Entity) {
  const numIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='request_no');

  const requestNum = ent.entity_attr[numIndex].entity_attr_value || '';
  return requestNum
};

function getRequestPosName(ent: Entity) {
  const posIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='position_name');

  const posName = ent.entity_attr[posIndex].entity_attr_value || '';
  return posName
};

function getRequestStatus(ent: Entity) {
  const statusIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='status');

  const requestStatus = ent.entity_attr[statusIndex].entity_attr_value || '';
  return requestStatus
};

export {
  dateToMUI, MUIToDate, getCandidateName, getCandidateSpec,
  getRequestNumber, getRequestPosName, getRequestStatus
}
