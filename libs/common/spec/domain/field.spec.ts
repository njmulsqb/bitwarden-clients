import { FieldType } from "@bitwarden/common/enums/fieldType";
import { FieldData } from "@bitwarden/common/models/data/fieldData";
import { Field } from "@bitwarden/common/models/domain/field";

import { mockEnc } from "../utils";

describe("Field", () => {
  let data: FieldData;

  beforeEach(() => {
    data = {
      type: FieldType.Text,
      name: "encName",
      value: "encValue",
      linkedId: null,
    };
  });

  it("Convert from empty", () => {
    const data = new FieldData();
    const field = new Field(data);

    expect(field).toEqual({
      type: undefined,
      name: null,
      value: null,
      linkedId: undefined,
    });
  });

  it("Convert", () => {
    const field = new Field(data);

    expect(field).toEqual({
      type: FieldType.Text,
      name: { encryptedString: "encName", encryptionType: 0 },
      value: { encryptedString: "encValue", encryptionType: 0 },
      linkedId: null,
    });
  });

  it("toFieldData", () => {
    const field = new Field(data);
    expect(field.toFieldData()).toEqual(data);
  });

  it("Decrypt", async () => {
    const field = new Field();
    field.type = FieldType.Text;
    field.name = mockEnc("encName");
    field.value = mockEnc("encValue");

    const view = await field.decrypt(null);

    expect(view).toEqual({
      type: 0,
      name: "encName",
      value: "encValue",
      newField: false,
      showCount: false,
      showValue: false,
    });
  });
});
