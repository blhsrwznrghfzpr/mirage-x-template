import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../base/common";

const detail = {
  code: "StyledUnit/StyledDVSprite",
  propsConfig: {
    name: UnitProp.String("Name"),
    url: UnitProp.Uri(""),
    rect: UnitProp.Rect([0, 0, 1, 1]),
    borders: UnitProp.Float4([0, 0, 0, 0]),
    scale: UnitProp.Float(1),
  },
  children: "multi" as "multi",
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
