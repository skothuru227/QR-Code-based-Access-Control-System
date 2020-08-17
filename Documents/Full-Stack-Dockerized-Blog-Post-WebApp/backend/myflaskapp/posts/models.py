from myflaskapp.database import (
    Column,
    Model,
    SurrogatePK,
    db,
    reference_col,
    relationship,
)

class Posts(SurrogatePK, Model):
    __tablename__ = 'posts'
    content = Column(db.String(360))
    created_at = Column(db.DateTime)

    '''
        Moved this serializable code to base CRUDMixin function.
    '''
    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'content': self.content,
    #         'created_at': self.created_at
    #     }

class Sample(SurrogatePK, Model):
    __tablename__ = 'sample'
    abc = Column(db.Integer)
