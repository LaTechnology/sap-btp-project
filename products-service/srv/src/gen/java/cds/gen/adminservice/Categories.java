package cds.gen.adminservice;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.processing.Generated;

/**
 * Aspect for a code list with name and description
 *
 * See https://cap.cloud.sap/docs/cds/common#aspect-codelist
 */
@CdsName("AdminService.Categories")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:00:55.627603400Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Categories extends CdsData {
  String NAME = "name";

  String DESCR = "descr";

  String ID = "ID";

  String PARENT = "parent";

  String PARENT_ID = "parent_ID";

  String CHILDREN = "children";

  String TEXTS = "texts";

  String LOCALIZED = "localized";

  String getName();

  void setName(String name);

  String getDescr();

  void setDescr(String descr);

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  Categories getParent();

  void setParent(Map<String, ?> parent);

  @CdsName(PARENT_ID)
  Integer getParentId();

  @CdsName(PARENT_ID)
  void setParentId(Integer parentId);

  List<Categories> getChildren();

  void setChildren(List<? extends Map<String, ?>> children);

  List<CategoriesTexts> getTexts();

  void setTexts(List<? extends Map<String, ?>> texts);

  CategoriesTexts getLocalized();

  void setLocalized(Map<String, ?> localized);

  Categories_ ref();

  static Categories create() {
    return Struct.create(Categories.class);
  }

  static Categories create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Categories.class);
  }
}
