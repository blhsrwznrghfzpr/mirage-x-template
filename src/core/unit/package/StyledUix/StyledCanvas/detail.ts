import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../base/common";

const detail = {
  code: "StyledUix/StyledCanvas",
  propsConfig: {
    size: UnitProp.Float2([1000, 1000]),
    position: UnitProp.Float3([0, 0, 0]),
    rotation: UnitProp.FloatQ([0, 0, 0, 0]),
    scale: UnitProp.Float3([1, 1, 1]),
    styledBackgroundSprite: UnitProp.String(""),
    styledBackgroundColor: UnitProp.String(""),
    defaultBackgroundColor: UnitProp.Color([1, 1, 1, 1]),
  },
  children: "multi" as const,
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
