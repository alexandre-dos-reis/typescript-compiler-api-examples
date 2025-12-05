import {
  factory as f,
  SyntaxKind as sk,
  NodeFlags,
  createPrinter,
} from "typescript";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const userTypeNode = f.createTypeAliasDeclaration(
  [f.createModifier(sk.ExportKeyword)],
  f.createIdentifier("User"),
  undefined,
  f.createTypeLiteralNode([
    // id: string
    f.createPropertySignature(
      undefined,
      "id",
      undefined,
      f.createKeywordTypeNode(sk.StringKeyword),
    ),
    // name: string
    f.createPropertySignature(
      undefined,
      "name",
      undefined,
      f.createKeywordTypeNode(sk.StringKeyword),
    ),
    // age?: number
    f.createPropertySignature(
      undefined,
      "age",
      f.createToken(sk.QuestionToken),
      f.createKeywordTypeNode(sk.NumberKeyword),
    ),
  ]),
);

const file = f.createSourceFile(
  [userTypeNode],
  f.createToken(sk.EndOfFileToken),
  NodeFlags.None,
);

const printer = createPrinter();

const output = printer.printFile(file);

await writeFile(join(import.meta.dir, "output.ts"), output);
