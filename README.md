# cat-universe-admin

Container: Only contains a field
Wrapper: Contains a many containers

All atoms are type="fields"

In atoms if a component is declared typeField is not necessary
Component goes with the porpertie "src" that's a sufix to the real name of the template "cat-form-mat-{{template}}.component.ts"
this component class is implemented in the src propertie location

Every CatFormTemplateDependency have openContainer, content and closeContainer
Every openContainer is colsed when all its atoms are parsed
