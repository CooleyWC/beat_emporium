"""added relationships

Revision ID: cc03df9b14cc
Revises: f0f92bbb7002
Create Date: 2024-05-13 21:37:12.266071

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc03df9b14cc'
down_revision = 'f0f92bbb7002'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('review_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_rentals_review_id_reviews'), 'reviews', ['review_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_rentals_review_id_reviews'), type_='foreignkey')
        batch_op.drop_column('review_id')

    # ### end Alembic commands ###
