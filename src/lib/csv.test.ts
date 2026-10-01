import { describe, expect, it } from 'vitest';
import { csvCell, parseRosterCsv, toCsv } from './csv';

describe('export CSV', () => {
  it('neutralise les injections de formules', () => {
    expect(csvCell('=SUM(A1)')).toBe("'=SUM(A1)");
    expect(csvCell('+1')).toBe("'+1");
    expect(csvCell('-x')).toBe("'-x");
    expect(csvCell('@cmd')).toBe("'@cmd");
    expect(csvCell('\tabc')).toBe("'\tabc");
  });

  it('échappe guillemets et séparateurs', () => {
    expect(csvCell('a;b')).toBe('"a;b"');
    expect(csvCell('dit "oui"')).toBe('"dit ""oui"""');
    expect(toCsv(['a', 'b'], [['1', '2']])).toBe('﻿a;b\r\n1;2');
  });

  it('lit un roster CSV simple et ignore les lignes sans e-mail', () => {
    const rows = parseRosterCsv('Nom;Email\nAmel D.;amel@exemple.test\n"Bastien L.",BASTIEN@exemple.test\nsans email');
    expect(rows).toEqual([
      { email: 'amel@exemple.test', display_name: 'Amel D.' },
      { email: 'bastien@exemple.test', display_name: 'Bastien L.' },
    ]);
  });
});
