export type GrepRecord = {
  filename: string;
  lineno: number;
  column: number;
  content: string;
};

export async function grep(expr: string, cwd: string): Promise<GrepRecord[]> {
  const p = Deno.run({
    cwd,
    cmd: ["rg", "--vimgrep", expr],
    stdin: "null",
    stdout: "piped",
    stderr: "null",
  });
  const decoder = new TextDecoder();
  const stdout = await p.output();
  p.close();
  const out = decoder.decode(stdout);
  return out.split(/\n/).filter((v) => v).map(parse);
}

function parse(record: string): GrepRecord {
  const m = record.match(/^(.*?):(\d+):(\d+):(.*)$/);
  if (!m) {
    throw new Error(`Failed to parse record: "${record}"`);
  }
  return {
    filename: m[1],
    lineno: parseInt(m[2], 10),
    column: parseInt(m[3], 10),
    content: m[4],
  };
}
