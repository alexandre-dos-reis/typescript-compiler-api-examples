import ts from "typescript";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const userTypeNode = ts.factory.createTypeAliasDeclaration(
  [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
  ts.factory.createIdentifier("User"),
  undefined,
  ts.factory.createTypeLiteralNode([
    // id: string
    ts.factory.createPropertySignature(
      undefined,
      "id",
      undefined,
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ),
    // name: string
    ts.factory.createPropertySignature(
      undefined,
      "name",
      undefined,
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ),
    // age?: number
    ts.factory.createPropertySignature(
      undefined,
      "age",
      ts.factory.createToken(ts.SyntaxKind.QuestionToken),
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ),
  ]),
);

const file = ts.factory.createSourceFile(
  [userTypeNode],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None,
);

const printer = ts.createPrinter();

const output = printer.printFile(file);

await writeFile(join(import.meta.dir, "output.ts"), output);
