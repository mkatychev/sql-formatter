import Formatter from 'src/formatter/Formatter';
import Tokenizer from 'src/lexer/Tokenizer';
import { functions } from './tsql.functions';
import { keywords } from './tsql.keywords';

// https://docs.microsoft.com/en-us/sql/t-sql/statements/statements?view=sql-server-ver15
const reservedCommands = [
  'ADD SENSITIVITY CLASSIFICATION',
  'ADD SIGNATURE',
  'AGGREGATE',
  'ANSI_DEFAULTS',
  'ANSI_NULLS',
  'ANSI_NULL_DFLT_OFF',
  'ANSI_NULL_DFLT_ON',
  'ANSI_PADDING',
  'ANSI_WARNINGS',
  'APPLICATION ROLE',
  'ARITHABORT',
  'ARITHIGNORE',
  'ASSEMBLY',
  'ASYMMETRIC KEY',
  'AUTHORIZATION',
  'AVAILABILITY GROUP',
  'BACKUP',
  'BACKUP CERTIFICATE',
  'BACKUP MASTER KEY',
  'BACKUP SERVICE MASTER KEY',
  'BEGIN CONVERSATION TIMER',
  'BEGIN DIALOG CONVERSATION',
  'BROKER PRIORITY',
  'BULK INSERT',
  'CERTIFICATE',
  'CLOSE MASTER KEY',
  'CLOSE SYMMETRIC KEY',
  'COLLATE',
  'COLUMN ENCRYPTION KEY',
  'COLUMN MASTER KEY',
  'COLUMNSTORE INDEX',
  'CONCAT_NULL_YIELDS_NULL',
  'CONTEXT_INFO',
  'CONTRACT',
  'CREDENTIAL',
  'CRYPTOGRAPHIC PROVIDER',
  'CURSOR_CLOSE_ON_COMMIT',
  'DATABASE',
  'DATABASE AUDIT SPECIFICATION',
  'DATABASE ENCRYPTION KEY',
  'DATABASE HADR',
  'DATABASE SCOPED CONFIGURATION',
  'DATABASE SCOPED CREDENTIAL',
  'DATABASE SET',
  'DATEFIRST',
  'DATEFORMAT',
  'DEADLOCK_PRIORITY',
  'DEFAULT',
  'DELETE',
  'DELETE FROM',
  'DENY',
  'DENY XML',
  'DISABLE TRIGGER',
  'ENABLE TRIGGER',
  'END CONVERSATION',
  'ENDPOINT',
  'EVENT NOTIFICATION',
  'EVENT SESSION',
  'EXECUTE AS',
  'EXTERNAL DATA SOURCE',
  'EXTERNAL FILE FORMAT',
  'EXTERNAL LANGUAGE',
  'EXTERNAL LIBRARY',
  'EXTERNAL RESOURCE POOL',
  'EXTERNAL TABLE',
  'FIPS_FLAGGER',
  'FMTONLY',
  'FORCEPLAN',
  'FULLTEXT CATALOG',
  'FULLTEXT INDEX',
  'FULLTEXT STOPLIST',
  'FUNCTION',
  'GET CONVERSATION GROUP',
  'GET_TRANSMISSION_STATUS',
  'GRANT',
  'GRANT XML',
  'IDENTITY_INSERT',
  'IMPLICIT_TRANSACTIONS',
  'INDEX',
  'INSERT',
  'LANGUAGE',
  'LOCK_TIMEOUT',
  'LOGIN',
  'MASTER KEY',
  'MERGE',
  'MESSAGE TYPE',
  'MOVE CONVERSATION',
  'NOCOUNT',
  'NOEXEC',
  'NUMERIC_ROUNDABORT',
  'OFFSETS',
  'OPEN MASTER KEY',
  'OPEN SYMMETRIC KEY',
  'PARSEONLY',
  'PARTITION FUNCTION',
  'PARTITION SCHEME',
  'PROCEDURE',
  'QUERY_GOVERNOR_COST_LIMIT',
  'QUEUE',
  'QUOTED_IDENTIFIER',
  'RECEIVE',
  'REMOTE SERVICE BINDING',
  'REMOTE_PROC_TRANSACTIONS',
  'RESOURCE GOVERNOR',
  'RESOURCE POOL',
  'RESTORE',
  'RESTORE FILELISTONLY',
  'RESTORE HEADERONLY',
  'RESTORE LABELONLY',
  'RESTORE MASTER KEY',
  'RESTORE REWINDONLY',
  'RESTORE SERVICE MASTER KEY',
  'RESTORE VERIFYONLY',
  'REVERT',
  'REVOKE',
  'REVOKE XML',
  'ROLE',
  'ROUTE',
  'ROWCOUNT',
  'RULE',
  'SCHEMA',
  'SEARCH PROPERTY LIST',
  'SECURITY POLICY',
  'SELECTIVE XML INDEX',
  'SEND',
  'SENSITIVITY CLASSIFICATION',
  'SEQUENCE',
  'SERVER AUDIT',
  'SERVER AUDIT SPECIFICATION',
  'SERVER CONFIGURATION',
  'SERVER ROLE',
  'SERVICE',
  'SERVICE MASTER KEY',
  'SET',
  'SETUSER',
  'SHOWPLAN_ALL',
  'SHOWPLAN_TEXT',
  'SHOWPLAN_XML',
  'SIGNATURE',
  'SPATIAL INDEX',
  'STATISTICS',
  'STATISTICS IO',
  'STATISTICS PROFILE',
  'STATISTICS TIME',
  'STATISTICS XML',
  'SYMMETRIC KEY',
  'SYNONYM',
  'TABLE',
  'TABLE IDENTITY',
  'TEXTSIZE',
  'TRANSACTION ISOLATION LEVEL',
  'TRIGGER',
  'TRUNCATE TABLE',
  'TYPE',
  'UPDATE',
  'UPDATE STATISTICS',
  'USER',
  'VIEW',
  'WORKLOAD GROUP',
  'XACT_ABORT',
  'XML INDEX',
  'XML SCHEMA COLLECTION',
  // other
  'ALTER COLUMN',
  'ALTER TABLE',
  'CREATE TABLE',
  'FROM',
  'GROUP BY',
  'HAVING',
  'INSERT INTO', // verify
  'DROP TABLE', // verify
  'SET SCHEMA', // verify
  'LIMIT',
  'OFFSET',
  'ORDER BY',
  'SELECT',
  'VALUES',
  'WHERE',
  'WITH',
  'WINDOW',
  'PARTITION BY',
];

const reservedBinaryCommands = [
  'INTERSECT',
  'INTERSECT ALL',
  'INTERSECT DISTINCT',
  'UNION',
  'UNION ALL',
  'UNION DISTINCT',
  'EXCEPT',
  'EXCEPT ALL',
  'EXCEPT DISTINCT',
  'MINUS',
  'MINUS ALL',
  'MINUS DISTINCT',
];

const reservedJoins = [
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'LEFT OUTER JOIN',
  'RIGHT JOIN',
  'RIGHT OUTER JOIN',
  'FULL JOIN',
  'FULL OUTER JOIN',
  'CROSS JOIN',
];

// https://docs.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver15
export default class TSqlFormatter extends Formatter {
  static operators = ['~', '!<', '!>', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=', '::'];

  tokenizer() {
    return new Tokenizer({
      reservedCommands,
      reservedBinaryCommands,
      reservedJoins,
      reservedDependentClauses: ['WHEN', 'ELSE'],
      reservedKeywords: keywords,
      reservedFunctionNames: functions,
      stringTypes: [{ quote: "''", prefixes: ['N'] }],
      identTypes: [`""`, '[]'],
      identChars: { first: '#@', rest: '#@$' },
      namedParamTypes: ['@'],
      quotedParamTypes: ['@'],
      operators: TSqlFormatter.operators,
      // TODO: Support for money constants
    });
  }
}
