"""Initial migration with organizations and memberships

Revision ID: f29c2b819bbe
Revises: 
Create Date: 2024-09-20 22:43:22.642906

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f29c2b819bbe'
down_revision = None
branch_labels = None
depends_on = None


#def upgrade():
#    # ### commands auto generated by Alembic - please adjust! ###
#    op.create_table('organizations',
#    sa.Column('id', sa.Integer(), nullable=False),
#    sa.Column('name', sa.String(length=128), nullable=False),
#    sa.Column('description', sa.String(length=256), nullable=True),
#    sa.PrimaryKeyConstraint('id')
#    )
#    op.create_table('membership',
#    sa.Column('id', sa.Integer(), nullable=False),
#    sa.Column('user_id', sa.Integer(), nullable=True),
#    sa.Column('organization_id', sa.Integer(), nullable=True),
#    sa.Column('role', sa.String(length=64), nullable=False),
#    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
#    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
#    sa.PrimaryKeyConstraint('id')
#    )
    # ### end Alembic commands ###


def upgrade():
    # Users Table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(length=128), nullable=False),
        sa.Column('email', sa.String(length=128), nullable=False),
        sa.Column('password_hash', sa.Text(), nullable=False)
    )

    # Organizations Table
    op.create_table(
        'organizations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=128), nullable=False),
        sa.Column('description', sa.String(length=256), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Events Table (New Addition)
    op.create_table(
        'events',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(length=128), nullable=False),
        sa.Column('description', sa.String(length=256), nullable=True),
        sa.Column('date', sa.DateTime(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False)
    )

    # Membership Table
    op.create_table(
        'membership',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('organization_id', sa.Integer(), nullable=True),
        sa.Column('role', sa.String(length=64), nullable=False),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id']),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    # Downgrade operations
    op.drop_table('membership')
    op.drop_table('events')
    op.drop_table('organizations')
    op.drop_table('users')
