-- RedefineIndex
DROP INDEX "sqlite_autoindex_invites_2";
CREATE UNIQUE INDEX "invites_phone_key" ON "invites"("phone");

-- RedefineIndex
DROP INDEX "sqlite_autoindex_invites_1";
CREATE UNIQUE INDEX "invites_email_key" ON "invites"("email");
